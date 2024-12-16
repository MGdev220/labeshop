/* eslint-disable no-unused-vars */
import { jwtDecode } from 'jwt-decode';
import {productsImages} from "../utils/initImage";


export const decodeUserByToken = (token = localStorage.getItem('token')) => {
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    }
    // Décoder le token
    return null;
}

export const isConnectUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const isValidToken = decodeUserByToken(token).id
        if (isValidToken) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}

export const initProductImages = (products = []) => {
    
    return products.map((p,i)=> {

      // const dd = productsImages.filter(e => p.Category.name.includes(e.image))
      // const ee = catReducer[p.Category.name]
      // ee.map((d, i) => {
      //   d.image = dd[i].image
      //   p = d ;
      // })

      p.image = productsImages[i].image ;

      return p ;
    })
  }