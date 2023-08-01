const nuevoProducto = (name, imageUrl, price, id) => {
    const card = document.createElement("div")
    const contenido = `
        < div class="product__card-edit hidden " >
                <button class="btnDelete" type="button"><img src="/assets/img/icons/delete.svg" alt="edition_icon" class="iconEdit" data-delete></button>
                <a href="../screens/edit-product?id=${id}"><img src="/assets/img/icons/edit.svg" alt="edition_icon" class="iconEdit" data-edit></a>
            </div >
            <div class="imgContainer">
                <img class="product__card--img" src = "${imageUrl}" alt = "imagen_del_producto">
            </div>
            <div class="product__card--info">
                <p class="product__card--title">${name}</p>
                <p class="product__card--price">${price}</p>
                <a href="../screens/viewProducts?id=${id}"  class="product__card-boton" data-verProducto>Ver producto</a>
            </div>
    `
    card.innerHTML = contenido
    card.dataset.id =id

    return card
}