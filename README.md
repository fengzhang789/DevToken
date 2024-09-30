<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="frontend/app/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center"><strong>DevToken - The Developer Currency</strong></h3>

  <p align="center">
    A web3 platform to be deployed on <a href="https://polygon.technology/">Polygon</a>, where developers can earn coins based on their GitHub contributions. DevTokens can be used to unlock profile badges to traded with fellow developers, adding a fun and interactive layer to the coding experience. 
    <!-- <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#tech-stack">System Design Patterns and Implementations</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

(This project is still a WIP).
Inspired by: [GitHub Insights](https://github.com/fengzhang789/Github-Insights) and [BlockXism](https://github.com/fengzhang789/BlockXism)
<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->
![image](https://github.com/user-attachments/assets/d876664a-f1b5-4bc4-aba4-dd5da477055d)
![image](https://github.com/user-attachments/assets/90b4221c-7087-4b5f-a415-339ab6f685db)
![image](https://github.com/user-attachments/assets/d0a51753-6316-45a4-818e-29e953750100)
![image](https://github.com/user-attachments/assets/8fae9b37-f591-45a4-af73-4554e15d943b)
![image](https://github.com/user-attachments/assets/96eaeb19-0bb6-42cc-966d-f1994afb5c76)
![image](https://github.com/user-attachments/assets/7229f231-4822-4786-a6ee-c412c55fa1e3)
![image](https://github.com/user-attachments/assets/7108208a-57e5-4422-adbf-fc450b4a6746)
![image](https://github.com/user-attachments/assets/4f607035-b2c3-49f2-a20a-e5489411addc)


Inspired by platforms that reward people for working productively (pomodoro like apps), I wanted to make a similar application for rewarding developer workflows. 

DevToken is an application that tracks your contributions (commits, PRs, issues, comments) across different repositories and rewards you DevTokens based on your contributions. You can send DevTokens to other developers and buy profile items from the marketplace. 

Users login using their GitHub profile via OAuth on the DevToken GitHub App. Users must also have the [Metamask Wallet](https://metamask.io/) installed and connect to the application using Metamask. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Tech Stack

#### Frontend
 [![Typescript][Typescript-shield]][Typescript-url]
 [![Next][Next.js]][Next-url]
 [![React][React.js]][React-url]
 [![GraphQL][GraphQL-shield]][GraphQL-url]
 [![Apollo GraphQL][Apollo-GraphQL-shield]][Apollo-GraphQL-url]
 [![Tailwind][Tailwind-shield]][Tailwind-url]
 [![Ethers][Ethers-shield]][Ethers-url]
 * Codegen by The Guild

#### Backend
 [![Typescript][Typescript-shield]][Typescript-url]
 [![Nodejs][Node-shield]][Node-url]
 [![Solidity][Solidity-shield]][Solidity-url]
 [![GraphQL][GraphQL-shield]][GraphQL-url]
 [![Apollo GraphQL][Apollo-GraphQL-shield]][Apollo-GraphQL-url]
 [![Type-GraphQL][Type-GraphQL-shield]][Type-GraphQL-url]
 [![Prisma][Prisma-shield]][Prisma-url]
 [![Postgres][Postgres-shield]][Postgres-url]
 [![Nodemon][Nodemon-shield]][Nodemon-url]
 * Hardhat
 
#### Misc
 [![Docker][Docker-shield]][Docker-url]
 [![Ethereum][Ethereum-shield]][Ethereum-url]

### System Design Patterns & Implementations

#### 1. Classes and Dependency Injection with TypeGraphQL
- TypeGraphQL allowed me to use Object-Oriented Programming (OOP) principles, such as classes and decorators, to define GraphQL resolvers and object models without using GraphQL SDL.
- Services were created to abstract the business logic away from the resolver classes. These services were instantiated as singletons and injected into the corresponding resolver classes using Dependency Injection (DI).

#### 2. Typescript Type Synchronization via Codegen
- GraphQL Codegen by [The Guild](https://the-guild.dev/graphql/codegen) was used to automatically synchronize Typescript types between the backend and frontend, ensuring consistent API return types. This eliminated manual type definition and reduced the risk of type mismatches between client and server.
- Apollo Client (frontend) and Apollo Server (backend) were used to handle data fetching and serving. 

#### 3. Prisma Object Relational Mapping (ORM) for PostgreSQL DB Interaction
- Prisma was used to define object models for the database (`schema.prisma`) and to perform database migrations.
- `prisma generate` updates the generated code with changes if your database schema changes - it will update `node_modules/.prisma/client`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

This is a list of items that you need to have to run this project
* Node.js 20.16.0
* Docker

### Installation

1. Install node packages on both the frontend and backend
    ```sh
    npm install
    ```

2. Create a `.env` file on the root directories of `/backend` and `/frontend`. 
- Frontend:
   ```js
  NEXT_PUBLIC_CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3" 
  NEXT_PUBLIC_GITHUB_CLIENT_ID="<CLIENT ID HERE>"
  NEXT_PUBLIC_REDIRECT_URI="http://localhost:3000/redirect"
  NEXT_PUBLIC_BACKEND_URI="http://localhost:5000/"
   ```
   
- Backend:
  ```js
  GITHUB_CLIENT_ID="<CLIENT ID HERE>"
  GITHUB_CLIENT_SECRET="<CLIENT SECRET HERE>"
  INFURA_PROJECT_KEY="<INFURA PROJECT KEY HERE>"
  WALLET_PRIVATE_KEY="<YOUR WALLET PRIVATE KEY HERE>"
  DATABASE_URL="postgresql://developer:backendPostgreSQL@localhost:5432/devtoken"
  ```

3. Run 
    ```js
    npm run dev
    docker compose up
    npm run hardhat-local
    npm run hardhat-deploy-local
    ``` 
    for the backend. Run `npm run dev` for the frontend and visit [localhost:3000](http://localhost:3000/) for the frontend, and [localhost:5000](http://localhost:5000/) for the backend Apollo explorer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Feng Zhang - [feng.zhang1@uwaterloo.ca](mailto:feng.zhang1@uwaterloo.ca)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- 
<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> --> 



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[GraphQL-shield]: https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white
[GraphQL-url]: https://graphql.org/

[Apollo-GraphQL-shield]: https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql
[Apollo-GraphQL-url]: https://www.apollographql.com/

[Typescript-shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Tailwind-shield]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[Type-GraphQL-shield]: https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=for-the-badge
[Type-GraphQL-url]: https://typegraphql.com/

[Docker-shield]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Prisma-shield]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/

[Postgres-shield]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/

[Node-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en

[Nodemon-shield]: https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD
[Nodemon-url]: https://www.npmjs.com/package/nodemon

[Ethereum-shield]: https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white
[Ethereum-url]: https://ethereum.org/en/

[Ethers-shield]: https://img.shields.io/badge/ETHERS.JS-red?style=for-the-badge&logo=ethers&logoColor=%23FFFFFF&logoSize=auto&color=%2324359f
[Ethers-url]: https://docs.ethers.org/v5/

[Solidity-shield]: https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white
[Solidity-url]: https://soliditylang.org/

