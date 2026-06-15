Markdown
# Gerenciador de Tarefas - Projeto Final DevOps (IFCE)

Sistema simplificado de gerenciamento de tarefas ("ToDo App") projetado para demonstrar na prática fluxos de trabalho ágeis, conteinerização e automação de deploys.

## Equipe
* **Francisco Ariel Carvalho da Silva** - Software e Database 
* **Maria Clara Vasconcelos de Sousa** - DevOps e Infra 
* **Alana Marques Pinheiro** - Tech Lead e QA Documenter

## Tecnologias e Recursos Aplicados
* **Runtime:** Node.js (JavaScript)
* **Banco de Dados :** SQLite para persistência simples local e em container.
* **Conteinerização:** Docker para isolamento e portabilidade da aplicação.
* **Gerenciamento de Versão:** Git com fluxo baseado em Branches organizadas e Pull Requests.

## Fluxo de Branches Adotado
* `main`: Filial estável com o código revisado e pronto para apresentação.
* `feature/*`: Branches temporárias usadas por cada integrante para o desenvolvimento de recursos específicos.

## Execução Local com Docker e Volumes 
Para rodar a aplicação localmente garantindo que os dados fiquem salvos mesmo após parar o container:

```bash
# 1. Construir a imagem Docker
docker build -t todo-app .

# 2. Executar o container acoplando o volume de dados local
docker run -v ./dados:/dados todo-app
