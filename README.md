# Gym App

## RNs (Regras de Negocio (condicoes das funcionalidades))
// TODO
## RNFs (Requisitos Nao Funcionais (infraestrutura))
// TODO
## RFs (Requisitos Funcionais (funcionalidades))
- Deve ser possivel registrar um planejamento de treino 
- Deve ser possivel cadastrar exercicio (ex: Supino reto)
- Deve ser possivel registrar uma serie (ex: 3x15 x4 c/ 20kg)
- Deve ser possivel registrar um execucoes (ex: x15 20kg)
- Deve ser possivel registrar tempo de descanso da execucao
- Deve ser possivel registrar o peso corporal em jejum do dia
- Deve ser possivel registrar uma observacao da execucao
- Deve ser possivel consultar o historico de treinos com suas execucoes 
- Deve ser possivel consultar a mesma serie foi realizada no treino anterior

# Entidades

## Planejamento de Treino
- Dia de inicio
- Dia de termino
- Lista de Treinos*

## Treino
- Nome
- Lista de Series*
- Peso Corporal no dia
- Data do Treino

## Exercicio
- Nome
- Observacao

## Execucao
- Carga
- Repeticoes
- Observacao
- Tempo de Descanso

## Serie
- Exercicio* 
- Lista de Execucoes*
- Observacao
