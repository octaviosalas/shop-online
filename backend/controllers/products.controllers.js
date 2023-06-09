import rackets from "../products/rackets.js"
import shoes from "../products/shoes.js"
import tshirts from "../products/tshirts.js"
import { allProducts } from "../products/allProducts.js";
import Favs from "../models/favouriteproducts.js"


export const getRackets = (req, res) => { 
    res.send(rackets)
}

export const getShoes = (req, res) => { 
    res.send(shoes)
}

export const getTshirts = (req, res) => { 
    res.send(tshirts)
}



export const getProdById = async (req, res) => { 
    const {id} = req.params
    console.log(req.params)

    try {
        const searchProd = allProducts.find((product) => product.id == id); //Busca en allProducts, el producto que tenga el mismo ID del que te llego por parametro
        res.json( searchProd );
    } catch (err) {
        res.send(err)
    }
}


export const markAsFavourite =  async  (req, res) => { 

     try {
        const { id, userId } = req.body; //Te va a llegar un Id del producto y un Id del usuario
        const favouriteProduct = new Favs ({ //Creame un documento en la coleccion Favs con esos datos que llegaron en el request
            productId: id,
            userId: userId
        })
        await favouriteProduct.save();
        res.json(favouriteProduct) 
        console.log(favouriteProduct)

    
     } catch (error) {
        console.log(error)
     }
}

export const favouriteProducts = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const favProds = await Favs.find({ userId: userId }); //Busca en la coleccion Favs, los productos con el ID que le llega por parametro
  
      const productIds = favProds.map((favProd) => Number(favProd.productId)); // Mapea esos productos, y convierte al productId en Numero para que lo reconozca. ProductsIds ahora es un array de IDS.
  
      const favoriteProducts = allProducts.filter((product) => // De todos mis productos, filtra y me devuelve solo los que tienen el mismo Id que los de la coleccion
        productIds.includes(product.id) //Me devuelve de AllProducts, el objeto entero que tenga el mismo Id que los que hay en la coleccion
      );
  
      res.json(favoriteProducts);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteFavourite = async (req, res) => { 
  
     const { userId } = req.params;
     const { id: productId } = req.body;
      
    try {
        await Favs.deleteMany({ userId, productId });
        res.send("Producto eliminado de la sección de Favoritos");    
     } catch (error) {
        console.log(error)
     }
  }

 
export const ofertas = async (req, res) => { 
      try {
        const foto = await Oferts.find()
        res.send(foto)
      } catch (error) {
        
      }
  } 


export const searchOfertById = async (req, res) => { 
    
    const {id} = req.params 

    try {
      const searchOfert = await Oferts.findById({_id: id})
      res.send(searchOfert)
    } catch (error) {
       console.log(error)
    }
  }

export const getImages =  (req, res) => { 
     const {id} = req.params

     try {
      const searchImage =  allProducts.find((product) => product.id == id)
      res.send([searchImage])
   
    } catch (error) {
       console.log(error)
    }

}

  