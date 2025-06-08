// test.ts
import { parseClient } from './src/services/parseClient';

// Função principal de teste (assíncrona para usar await)
async function testUserUpdate() {
  console.log('🧪 Iniciando o teste de atualização...');

  // 1. Define os novos dados que serão enviados para atualização
  const updatedInfo = {
    id: 3, // ID do usuário a ser atualizado
    // O ID é necessário para identificar qual usuário atualizar
    // e deve ser o mesmo que o mockUser.id
    name: 'Nome Novo em Folha',
    email: '',

  };

  console.log('\nEnviando os seguintes dados para o método put:', updatedInfo);

  // 2. Chama o método 'put' do seu cliente
  const response = await parseClient.put('/users/me', updatedInfo);

  console.log('\n✅ Resposta recebida da API:');
  console.log(response);

// 3. Verifica se os dados retornados estão corretos
  console.log('\n--- Verificação Final ---');
  if (response.data && response.data.name === 'Nome Novo em Folha') {
    console.log('👍 SUCESSO! O objeto retornado contém os dados atualizados.');
  } else {
    console.log('👎 FALHA! O objeto retornado não foi atualizado corretamente.');
  }
}

// Executa o teste
  // comando para teste: ts-node test
testUserUpdate();
