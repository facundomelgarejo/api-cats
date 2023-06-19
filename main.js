

let imgFav1 = document.querySelector('#imgFav1')
let spanError = document.querySelector('#randomCatsError')
const URL_API_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_4U4ZSAGeAE2TxeJpkprjFr46jgnmaxFtYjxDp7kY5ExKZCT1mkXgGNYVtzTFqcdo'
const URL_API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_4U4ZSAGeAE2TxeJpkprjFr46jgnmaxFtYjxDp7kY5ExKZCT1mkXgGNYVtzTFqcdo'
const URL_API_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_4U4ZSAGeAE2TxeJpkprjFr46jgnmaxFtYjxDp7kY5ExKZCT1mkXgGNYVtzTFqcdo`

const URL_API_TRASHBIN = 'https://api.thecatapi.com/v1/favourites?api_key=live_224cKRlLieA3ZUpuxiaiFzPc3BxtKs9sJVXoVIeZyzeqHpNzul8kSxJBTYkCwfy8'
const URL_API_TRASHBIN_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_224cKRlLieA3ZUpuxiaiFzPc3BxtKs9sJVXoVIeZyzeqHpNzul8kSxJBTYkCwfy8`



async function loadRandomCat(){
    
    const res = await fetch(URL_API_RANDOM)
    const data = await res.json()
    
    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error ' + res.status + data.message;
    }else {
        
        const img1 = document.querySelector('#img1')
        const img2 = document.querySelector('#img2')
        const img3 = document.querySelector('#img3')
        const btnSave1 = document.querySelector('#btnSave1')
        const btnSave2 = document.querySelector('#btnSave2')
        const btnSave3 = document.querySelector('#btnSave3')

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        img1.style.height = '350px'
        img2.style.height = '350px'
        img3.style.height = '350px'

        btnSave1.onclick = () => saveFavouriteCats(data[0].id)
        btnSave2.onclick = () => saveFavouriteCats(data[1].id)
        btnSave3.onclick = () => saveFavouriteCats(data[2].id)

        
    }
    const containerEskeleton1 = document.querySelector('.containerEskeleton1')
    const containerEskeleton2 = document.querySelector('.containerEskeleton2')
    const containerEskeleton3 = document.querySelector('.containerEskeleton3')
    containerEskeleton1.innerHTML = '';
    containerEskeleton2.innerHTML = '';
    containerEskeleton3.innerHTML = '';
}


async function loadfavouriteCats(){
    const res = await fetch(URL_API_FAVOURITES)
    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error ' + res.status + data.message;
    }else {
        console.log(data)
        const section = document.querySelector('#sectionFavouriteCats')
        section.innerHTML = ''
        const arreglo = data.reverse()
        arreglo.forEach(michi => {
            
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btnDelete = document.createElement('button')
            const imgDelete = document.createElement('img')

           
            
            btnDelete.classList.add('btnDelete')
            btnDelete.onclick = () => deteleFavouriteCats(michi.id, michi.image.id) ;
   
            
            imgDelete.src = 'https://cdn-icons-png.flaticon.com/128/6932/6932392.png'
            btnDelete.appendChild(imgDelete)
            img.src = michi.image.url
            img.style.height = '350px'
            img.classList.add('imgCat')

            article.classList.add('col-lg-3')
            article.classList.add('articleFav')
            
            section.classList.add('row')
            section.classList.add('sectionFav')
            article.appendChild(btnDelete)
            article.appendChild(img)
            section.appendChild(article)

            
        });
        

    }

}

async function saveFavouriteCats(id){
    const res = await fetch(URL_API_FAVOURITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'appLication/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    })

    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error ' + res.status + data.message;
    }else {
        showToast()
    }
    /* pasar por parametro la palabra que se va a mostrar en el Toast  */
    let parameter = 'favoritos'
    
    showToast(parameter)
    loadfavouriteCats() 
}

async function deteleFavouriteCats(id, imageID){

    const res0 = await fetch(URL_API_TRASHBIN) 
    const data = await res0.json()

    if(data.length > 2){
        alert("Papelera llena")
    }else{
        
    const res0 = await fetch(URL_API_FAVOURITES_DELETE(id),{
        method: 'DELETE',
    })
        if(res0.status !== 200){
            console.log('Hubo un error ' + res.status + data.message)
        }else {
            saveTrashbinCats(imageID)
            console.log('gatito borrado con exito')
        }
        showToast()  
        loadfavouriteCats()
    }


    
}

//------------ TRASHBIN ----------------------
async function loadTrashbinCats(){
    const res = await fetch(URL_API_TRASHBIN)
    const data = await res.json()

    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error ' + res.status + data.message;
    }else {
        const section = document.querySelector('#sectionTrashbin')
        section.innerHTML = ''
        const arreglo = data.reverse()
        arreglo.forEach(michi => {
            
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btnDelete = document.createElement('button')
            
            const imgDelete = document.createElement('img')
            const rowRecover = document.createElement('div')
            const btnRecover = document.createElement('button')
            const imgRecover = document.createElement('img')

            rowRecover.classList.add('row')
            img.style.height = '350px'
            article.classList.add('col-lg-3')
            article.classList.add('articleTraishbin')

            btnDelete.classList.add('btnDelete')
            btnDelete.style.height = '350px'
            btnRecover.classList.add('btnRecover')
            btnRecover.classList.add('w-100')
            imgDelete.src = 'https://cdn-icons-png.flaticon.com/128/6932/6932392.png'
            imgRecover.src = 'https://cdn-icons-png.flaticon.com/128/9448/9448313.png'
            btnDelete.appendChild(imgDelete)
         
           
            
            btnRecover.appendChild(imgRecover)
            btnDelete.onclick = () => deteleTrashbinCats(michi.id);
            btnRecover.onclick = () => saveFavouriteCats(michi.image.id) & deteleTrashbinCats(michi.id);
            img.classList.add('imgCat')
            img.src = michi.image.url
            img.width = 200
            rowRecover.appendChild(btnRecover)
            article.appendChild(img)
            article.appendChild(btnDelete)
            article.appendChild(rowRecover)
            section.appendChild(article)

            
        });
        const divEmpty = document.createElement('div')
        const btnEmpty = document.createElement('button')
        const textBtnEmpty = document.createTextNode('Empty Trash Bin')

        divEmpty.classList.add('row')
        btnEmpty.appendChild(textBtnEmpty);
        btnEmpty.classList.add('btnEmpty')
        btnEmpty.classList.add('btn')
        btnEmpty.classList.add('btn-danger')
        btnEmpty.classList.add('col-lg-4')
        btnEmpty.classList.add('offset-lg-4')

        divEmpty.appendChild(btnEmpty)
        section.appendChild(divEmpty)
        btnEmpty.onclick = async () =>  { 
            const res = await fetch(URL_API_TRASHBIN)
            const data = await res.json()

            const arreglo = data.reverse()
            arreglo.forEach(michi => {
                emptyTrash(michi.id)
            })
        }
    }

}

async function saveTrashbinCats(id){
    
        const res = await fetch(URL_API_TRASHBIN,{
            method: 'POST',
            headers: {
                'Content-Type': 'appLication/json',
            },
            body: JSON.stringify({
                image_id: id
            })
        })
    
        if(res.status !== 200){
            spanError.innerText = 'Hubo un error ' + res.status
        }else{
            loadTrashbinCats();
            showToast()
        }
    
   

    
}

async function deteleTrashbinCats(id){
    const res = await fetch(URL_API_TRASHBIN_DELETE(id),{
        method: 'DELETE',
    })

    if(res.status !== 200){
        console.log('Hubo un error ' + res.status)
    }else {
        showToast()
    }
    loadTrashbinCats()
}

async function emptyTrash(id){
    const res = await fetch(URL_API_TRASHBIN_DELETE(id),{
        method: 'DELETE',
    })

    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un error ' + res.status;
    }else {
        showToast()
    }
    loadTrashbinCats()
}

function showToast() {

    let myAlert = document.querySelector('.toast')
        let bsAlert = new bootstrap.Toast(myAlert)
        bsAlert.show()
    
  }

loadRandomCat()
loadfavouriteCats()
loadTrashbinCats()