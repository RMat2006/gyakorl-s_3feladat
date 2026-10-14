

const PostMethod = async (url,data)=>{
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error("Hiba: ", response.status)
        }
        return await response.json()
    }catch(error){
        throw new Error("Hiba: ", error.message);
    }
}

const Getmethod = async (url)=>{
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("HIba: ", response.status)
        }
        return response.json();
    }catch(error){
        throw new Error("HIba: ", error.message)
    }
}

document.addEventListener("DOMContentLoaded", async ()=>{
    document.getElementById("gomb").addEventListener("click", async ()=>{
        try{
            const bevitel = document.getElementById("bevitel")
            const adat = bevitel.value
            const select = document.getElementById("lista")


            const getResponse= await Getmethod("http://127.0.0.1:3000/api/names");
            console.log("Fetch eredménye: ", getResponse);
            

            const postMethod = await PostMethod("http://127.0.0.1:3000/api/names",{
                "nev": adat
            })
            const lista = Object.keys(getResponse.lista);
            for(let i=0;i<lista.length;i++){
                const opt = document.createElement("option");
                opt.innerText = lista[i]
                opt.value = lista[i]

                select.appendChild(opt);
            }


        }catch(error){
            console.error("Hiba: ", error);
        }
    })
})