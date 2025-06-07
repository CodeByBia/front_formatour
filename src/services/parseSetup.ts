// src/services/parseSetup.ts
// Configuração do Parse para uso com Back4App
import Parse from 'parse/node';

// Substitua pelos valores do seu app Back4App
const PARSE_APP_ID = 'yQpQ4ynuRNkEWIkLyA28TeaET1X88kXniiUzZYRz';
const PARSE_JS_KEY = 'fXfgIh0EIAyiHDGVvGVAbyBH4mBTax0w9PxE39rv';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com';

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

// Corrigir tipagem de funções, evitar uso de 'any'.

export default Parse;
