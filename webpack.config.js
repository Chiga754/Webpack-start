// path используется для работы с путями
const path = require('path');
// HtmlWebpackPlugin Используется для автоматического подключения скриптов к HTML файлу
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CleanWebpackPlugin используется для очистки папки dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // С помощью свойства можно context указываем в какой папке лежат исходные файлы.
    context: path.resolve(__dirname, 'src'),
    // Использовать ли встроенную оптимизацию?
    mode: 'development', 
    //Точка входа
    entry: {
        main : './index.js',
        analytics : './analytics.js'
    },
    // Конечный файл
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "dist")
    },
    resolve : {
        // Расширения которые будет понимать js (можно в коде явно не указывать '.js', '.json', '.png')
        extensions : ['.js', '.json', '.png'],
        // Элиасы нужны для того чтобы кратко указывать необходимый путь
        alias : {
            "@models" : path.resolve(__dirname, 'src/models'),
            "@" : path.resolve(__dirname, 'src'),
        }
    },
    // Настройки для работы webpack-dev-server
    devServer: {
        open: true,
        hot: true,
        port: 'auto',
        static: {
           directory: './src',
           watch: true
        }
     },
    // Оптимизация (При двойном подключении библиотеки(например jquery) выносися в отдельные файлы)
    optimization:  {
        splitChunks: {
            chunks: "all",
        },
    },
    // Плагины
    plugins : [
        new HtmlWebpackPlugin({
            // Взять за основу файл:
            template : './index.html',
            // ! Без этого поля скрипты подключаются в метатеге. ПОЧИТАТЬ
            scriptLoading: "blocking",
        }),
        // Очистка папки dist
        new CleanWebpackPlugin(),
    ],
    //  Здесь определяется, как будут обрабатываться различные типы модулей
    module : {
        // В массиве rules описываем лоадеры
        rules: [
            // Лоадер для фалов css
            {
                test: /\.css$/,
                //css-loader позволяет webpack понимать css
                //style-loader Добавляет стили в head
                use : ['style-loader','css-loader']
            },
            // Лоадер для картинок
            {
                test : /\.(png|jpg|svg|gif)$/,
                //! Почему то тут нужно использовать type: 'asset/resource', вместо use : [file-loader]. РАЗОБРАТЬСЯ!
                type: 'asset/resource',
            },
            // Лоадер для работы с шрифтами
            {
                test: /\.(ttf|woff|wof2|eot)$/,
                type: 'asset/resource',
            },
            // Лоадер для работы с XML
            {
                test : /\.xml$/,
                use : ['xml-loader'],
            },
            // Лоадер для работы с CSV
            {
                test : /\.csv$/,
                use : ['csv-loader'],
            }
        ]
    }
}