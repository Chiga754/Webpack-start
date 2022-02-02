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
            // Лоадер лоя картинок
            {
                test : /\.(png|jpg|svg|gif)$/,
                //! Почему то тут нужно использовать type: 'asset/resource', вместо use : [file-loader]. РАЗОБРАТЬСЯ!
                type: 'asset/resource',
            }
        ]
    }
}