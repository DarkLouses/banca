import { account_class } from "./account_class.js";

class account_list_class {

    account_list = new Array();

    // añade en la ultima posicion del array //
    add_Account(account = new account_class()) {
        this.account_list.push(account);
    }

    // elimina un objeto de la ultima posicion del array //
    delete_Account() {
        this.account_list.pop();
    }

    // bucle que elimina todo los objeto del array //
    delete_all_Account() {
        while(this.account_list.length != 0) {
            this.delete_Account();
        }
    }

    // visualiza por consola el contenido del array //
    show_Account_List() {
        for (const iterator of this.account_list) {
            console.log(iterator);
        }
    }

    // castea por medio de bucle un array de objetos generico a array objetos de tipo usuario y pusheandolos al array deseado //
    cast_array_to_Account(generic_array) {
        for (const data_array of generic_array) {
            this.add_Account(Object.assign(new move_class(), data_array));
        }
    }

    // carga el contenido asincronamente de un json al array casteandolo a objetos  //
    async fetch_load_Account(url) {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            this.cast_array_to_Account(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

    async fetch_account_set_Data(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json()
            alert(datos.error);
        } catch(err) {
            alert(err);
        }
    }
    
    async fetch_set_data_load_Account(url, data) {
        try {
            const res = await fetch (
                url, {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
            })
            const datos = await res.json();
            this.cast_array_to_Account(Array.from(datos.list));
        } catch(err) {
            console.log(err)
        }
    }

}

export { account_list_class };