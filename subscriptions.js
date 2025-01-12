/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onCreatePerson(filter: $filter) {
      id
      name
      email
      Boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onUpdatePerson(filter: $filter) {
      id
      name
      email
      Boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
    onDeletePerson(filter: $filter) {
      id
      name
      email
      Boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard($filter: ModelSubscriptionBoardFilterInput) {
    onCreateBoard(filter: $filter) {
      id
      message
      name
      image
      personID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard($filter: ModelSubscriptionBoardFilterInput) {
    onUpdateBoard(filter: $filter) {
      id
      message
      name
      image
      personID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard($filter: ModelSubscriptionBoardFilterInput) {
    onDeleteBoard(filter: $filter) {
      id
      message
      name
      image
      personID
      createdAt
      updatedAt
      __typename
    }
  }
`;
