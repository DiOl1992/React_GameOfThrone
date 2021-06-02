// import React from 'react';

export default class GOTService{

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

            getResource = async (url) => {
                const res = await fetch(`${this._apiBase}${url}`); //promise
                
                //обработка серверной ошибки 404
                if (!res.ok){
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                }
        
                return await res.json();
                };
        
            //метод чтобы получать персонажей из 5 страницы постов
            getAllCharacters = async () => {
                const res = await this.getResource('/characters?page=5');
                return res.map(this._transformChar);
            }
        
            //получать отдельного персонажа по id
            getCharacter = async (id) =>{
                const character = await this.getResource(`/characters/${id}`);
                return this._transformChar(character);
            }

            getAllHouses = async () => {
                const houses = await this.getResource('/houses');
                return houses.map(this._transformHouse);
            }

            getHouse = async (id) => {
                const house = await this.getResource(`/houses/${id}`);
                return this._transformHouse(house);
            }

            getAllBooks = async () => {
                const books = await this.getResource('/books');
                return books.map(this._transformBook);
            }

            getBook = async (id) => {
                const book = await this.getResource(`/books/${id}`);
                return this._transformBook(book);
            }

            isSet(data){
                if(data){
                    return data 
                } else {
                    return 'нет информании'
                }
            }

            _extractId = (item) => {
                const idRegExp = /\/([0-9]*)$/;
                return item.url.match(idRegExp)[1];
            }

            _transformChar = (char) => {
                return {
                    id: this._extractId(char),
                    name: this.isSet(char.name),
                    gender: this.isSet(char.gender),
                    born: this.isSet(char.born),
                    died: this.isSet(char.died),
                    culture: this.isSet(char.culture)
                }
                    
            }

            _transformHouse = (house) => {
                return {
                    id: this._extractId(house),
                    name: this.isSet(house.name),
                    region: this.isSet(house.region),
                    words: this.isSet(house.words),
                    titles: this.isSet(house.titles),
                    overlord: this.isSet(house.overlord),
                    ansectralWeapons: this.isSet(house.ansectralWeapons)
                }
            }

            _transformBook = (book) => {
                return {
                    id: this._extractId(book),
                    name: this.isSet(book.name),
                    numberOfPages: this.isSet(book.numberOfPages),
                    publiser: this.isSet(book.publiser),
                    released: this.isSet(book.released)
                }
            }
      
}

    
