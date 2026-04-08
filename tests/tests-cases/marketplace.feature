Feature: Marketplace

  Scenario: Listagem de produtos com sucesso
    Given que o usuário acessa o marketplace
    When a aplicação realiza a requisição de produtos com sucesso
    Then deve exibir uma lista de produtos

  Scenario: API fora do ar (sem tratamento - comportamento antigo)
    Given que o usuário acessa o marketplace
    When ocorre erro ao carregar produtos
    Then a lista de produtos não deve ser exibida
    And deve haver erro no console

  Scenario: API fora do ar (com tratamento)
    Given que o usuário acessa o marketplace
    When ocorre erro ao carregar produtos
    Then deve exibir a mensagem "Erro ao carregar produtos"
    And deve exibir o botão "Tentar novamente"

  Scenario: Retry após erro
    Given que ocorreu erro ao carregar produtos
    When o usuário clica em "Tentar novamente"
    And a API responde com sucesso
    Then deve exibir a lista de produtos

  Scenario: Retry com erro novamente
    Given que ocorreu erro ao carregar produtos
    When o usuário clica em "Tentar novamente"
    And a API continua com erro
    Then deve exibir a mensagem de erro novamente
    And deve exibir o botão "Tentar novamente"

  Scenario: Múltiplos cliques no retry
    Given que ocorreu erro ao carregar produtos
    When o usuário clica múltiplas vezes em "Tentar novamente"
    Then apenas uma requisição deve ser feita
    And o botão deve ficar desabilitado durante o loading