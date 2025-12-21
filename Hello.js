import { response } from "express"
export default function Hello(app) {

const sayHello = (req, res) => {res.send('Life is Good!')};
const sayWelcome = (req,res) => {res.send('Welcome to Full Stack Development!')}
app.get('hello', sayHello);
app.get('/', sayWelcome);
}