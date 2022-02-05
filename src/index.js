import * as $ from 'jquery';
import Post from "@models/Post";
import json from './assets/json';
import './styles/styles.css';
import WebpackLogo from './assets/webpack-logo';
import xml from "../src/assets/data.xml";
import csv from "../src/assets/data.csv";

const post = new Post('Webpack post title', WebpackLogo);
$('pre').addClass('code').html(post.toString());
// console.log('JSON: ',json)
// console.log('XML: ',xml);
// console.log('CSV: ',csv);