# feedget

Project developed in the NLW (next level week) of <a href="https://rocketseat.com.br/" >Rocketseat</a> 🚀

Feedget is a widget to send a feedback, you can send a bug, idea or other

![Hnet-image](https://user-images.githubusercontent.com/28275815/168937420-88a8b977-8814-4355-8f12-9a1fcd35a2e6.gif)

<hr />

### For execute in your machine ☕
<pre>

On project web and server folder

Install all dependencies
$ npm install

Start the Application
$ npm run dev

On project mobile folder

Install all dependencies
$ npm install

Start the Application
$ expo start

</pre>

<hr />

### Server

Our server has the following routes: 

<pre>

[POST] /feedbacks

body params: {
  type: 'BUG' | 'IDEA' | 'OTHER',
  comment: string
  sreenshot: string (base64)
}

</pre>

<hr />

### Email

When the user submits feedback, an email is sent to the app maintainer to inform them of new feedback.

The dev email provider: <a href='https://mailtrap.io/'>MailTrap</a>

<hr />

### Deployment

#### Web
The web was deployed in the <a href='https://vercel.com' >vercel</a> and is avaliable in the following link:
https://feedget-ten-umber.vercel.app/

#### Server

The server was deployed in the <a href='https://railway.app' >railway</a> and is avaliable in the following link:
https://feedget-production-24a2.up.railway.app/

<hr />

### Built with
<ul>
  <li><a href="https://reactjs.org">ReactJS</a></li>
  <li><a href="https://reactnative.dev">React Native</a></li>
  <li><a href="https://nodejs.org/en">NodeJS</a></li>
  <li><a href="https://expo.dev">Expo</a></li>
  <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
  <li><a href="https://jestjs.io/">JestJS</a></li>
</ul>
