/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
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
export const getPersonByEmail = /* GraphQL */ `
  query GetPersonByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPersonByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        age
        tel
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBoard = /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
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
export const listBoardsByName = /* GraphQL */ `
  query ListBoardsByName($name: String) {
    listBoards(filter: { name: { contains: $name } }) {
      items {
        id
        message
        name
        image
        personID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listBoardsByPartialNameOrMessage = /* GraphQL */ `
  query ListBoardsByPartialNameOrMessage($search: String) {
    listBoards(filter: { or: [{ name: { contains: $search } }, { message: { contains: $search } }] }) {
      items {
        id
        message
        name
        image
        personID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listBoards = /* GraphQL */ `
  query ListBoards(
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        name
        image
        personID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const boardsByPersonID = /* GraphQL */ `
  query BoardsByPersonID(
    $personID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    boardsByPersonID(
      personID: $personID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        name
        image
        personID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
