const { DefaultAzureCredential } = require ("@azure/identity");
const { SecretClient } = require ("@azure/keyvault-secrets")

class KeyVaultService {
    constructor(keyVaultUrl){
        const credential = new DefaultAzureCredential()
        this.client = new SecretClient(keyVaultUrl, credential)
    }

    async getSecret(secretName){
        try {
            const result = await this.client.getSecret(secretName)
            return result.value
            
        } catch (error) {
            console.error("Error getting secret:", error.message);
            return undefined;            
        }
    }


    async setSecret(secretName, value) {
    try {
      await this.client.setSecret(secretName, value);
      console.log(`Secret '${secretName}' set successfully.`);
      return true
    } catch (error) {
      console.error("Error setting secret:", error.message);
      return false
    }
  }

  async deleteSecret(secretName) {
    try {
      await this.client.beginDeleteSecret(secretName);
      console.log(`Secret '${secretName}' deleted successfully.`);
      return true
    } catch (error) {
      console.error("Error deleting secret:", error.message);
      return false
    }
  }

  async listSecrets() {
    try {
      const properties = this.client.listPropertiesOfSecrets();
      const secretNames = [];
      for await (const prop of properties) {
        secretNames.push(prop.name);
      }
      return secretNames;
    } catch (error) {
      console.error("Error listing secrets:", error.message);
      return [];
    }
  }    

}

const keyVault = new KeyVaultService(process.env.VAULT_URI)

module.exports = keyVault
