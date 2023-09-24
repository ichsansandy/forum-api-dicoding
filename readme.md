<a name="readme-top"></a>

<div align="center">

  <h1><b>Forum API</b></h1>

</div>

<!-- TABLE OF CONTENTS -->

## 📗 Table of Contents

- [📖 Forum API ](#-gemstone-blog-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
    - [Key Features ](#key-features-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Usage](#usage)
    - [Test](#test)
  - [👥 Author ](#-author-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [🙏 Acknowledgments ](#-acknowledgments-)
  - [📝 License ](#-license-)

<!-- PROJECT DESCRIPTION -->

# 📖 Forum API <a name="about-project"></a>

**Forum API** is a backend server for a forum, this project made using hapi.js and postgres for database
<br>
I use [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to create these project
<br>
These project is also a requirement to passed Expert Backend Developer class at [dicoding](https://www.dicoding.com/)


## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
    <summary>Server</summary>
        <li><a href="https://nodejs.org/en">Node</a></li>
</details>
<details>
      <summary>Database</summary>
        <li><a href="https://www.postgresql.org/">Postgres</a></li>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **Authentication**
- **Making comment on thread and reply on each comment**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://stock-wise.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

```
    node >= 14.0
    postgres >- 15.3
```

### Setup

Clone this repository to your desired folder:

```bash
    git clone https://github.com/ichsansandy/forum-dicoding-api.git
```

You need to setup database for these project

```
    test        = forum_api_test
    production  = forum_api
```

for testing you need to setup and change the ```config/database/test.json```

```json
    {
        "user": <your-user>,
        "password": <your-password>,
        "host": "localhost",
        "port": 5432,
        "database": "forum_api_test"
    }
```

and for create  ```.env``` file for basic configuration
<br>
you can create your own access token for encryption by yourself or from generate it randomly [here](https://generate-random.org/api-token-generator)
```json
    # HTTP SERVER
    HOST=localhost
    PORT=5000

    # POSTGRES
    PGHOST=localhost
    PGUSER=<your-user>
    PGPASSWORD=<your-password>
    PGDATABASE=forum_api
    PGPORT=5432

    # POSTGRES TEST
    PGHOST_TEST=localhost
    PGUSER_TEST=<your-user>
    PGPASSWORD_TEST=<your-password>
    PGDATABASE_TEST=forum_api_test
    PGPORT_TEST=5432

    # TOKENIZE
    ACCESS_TOKEN_KEY=<your-access-token>
    REFRESH_TOKEN_KEY=<your-refresh-token>
    ACCCESS_TOKEN_AGE=3000

```

### Install

Install this project with:

```bash
  cd forum-dicoding-api
  npm install
```

it will install the required gemfile for running the project

### Usage

to use this project:

```bash
   npm run start
```

it will run the the server on ```localhost:5000```

### Test

to run test in these this project:

```ruby
   npm run test
```

it will run the all the unit test and integration of these project




<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 👥 Author <a name="author"></a>

👤 **Ichsan Sandy**

- GitHub: [@ichsansandy](https://github.com/ichsansandy)
- Twitter: [@1chsansandy](https://twitter.com/1chsansandy)
- LinkedIn: [Ichsan Sandy](https://linkedin.com/in/ichsans)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- **API Documentation**


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project you can share this project to your friend

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank [dicoding](https://www.dicoding.com/) for this project

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
