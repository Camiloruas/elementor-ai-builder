# Elementor AI Builder

Este projeto é um motor de geração de landing pages para WordPress que utiliza inteligência artificial para criar o conteúdo estratégico e uma lógica local rigorosa para construir o arquivo JSON final compatível com o Elementor. 

Diferente de abordagens que tentam fazer a IA gerar todo o código (o que frequentemente resulta em erros de sintaxe), este sistema separa a camada de copy da camada de estrutura. A IA é responsável exclusivamente pelo conteúdo textual e estratégico, enquanto o servidor valida esses dados e os injeta em templates estruturais testados.

## Diferenciais Técnicos

A arquitetura foi desenhada priorizando a confiabilidade do arquivo gerado. Alguns pontos que demonstram o cuidado com a engenharia de software:

* Uso de JSON Schema com a funcionalidade de "strict mode" da OpenAI para garantir que a resposta da API siga exatamente o formato esperado, eliminando falhas de parsing.
* Sistema de validação interna que verifica a integridade do documento Elementor antes de entregá-lo, garantindo que widgets, colunas e seções respeitem a hierarquia do plugin.
* IDs únicos gerados programaticamente para cada elemento, evitando conflitos de importação no WordPress.
* Separação clara entre a lógica de negócio e os templates visuais, permitindo a expansão para novos layouts sem alterar o núcleo do sistema.

## Funcionamento

O fluxo de dados ocorre em três etapas principais:

1. Processamento do Prompt: O input do usuário é enriquecido com instruções específicas que orientam a IA a focar em conversão e copywriting.
2. Extração de Conteúdo: A API retorna os textos estruturados (Hero, Benefícios, Oferta, FAQ).
3. Montagem do Documento: O servidor seleciona o template desejado e mapeia o conteúdo para os componentes do Elementor, gerando o arquivo pronto para importação.

## Tecnologias Utilizadas

O projeto foi construído utilizando Node.js puro com Express, focando em simplicidade e performance. A integração com a OpenAI utiliza o modelo GPT-4o-mini para um equilíbrio entre inteligência e custo de processamento. A validação de esquema e a gestão de ambiente via Dotenv garantem a segurança e a robustez necessárias para um ambiente de desenvolvimento profissional.

## Como Executar

Para rodar o projeto localmente, basta instalar as dependências com o comando npm install e configurar sua chave de API no arquivo .env. O servidor pode ser iniciado via npm start ou em modo de desenvolvimento com npm run dev. Existe também um script de smoke test para validações rápidas sem a necessidade de um cliente frontend.
