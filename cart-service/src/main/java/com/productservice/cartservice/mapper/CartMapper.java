package com.productservice.cartservice.mapper;

import com.productservice.cartservice.model.Cart;
import com.productservice.cartservice.model.CartDTO;
import com.productservice.cartservice.model.CartItem;
import com.productservice.cartservice.model.CartItemDTO;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    public Cart toCartEntity(CartDTO cartDTO){
        Cart cart = new Cart();
        cart.setId(cartDTO.id());
        cart.setUserId(cartDTO.userId());
        return cart;
    }
    public CartDTO toCartDTO(Cart cart){
        return new CartDTO(cart.getId(), cart.getUserId());
    }

    public CartItem toCartItemEntity(CartItemDTO cartItemDTO){
        CartItem cartItem = new CartItem();
        cartItem.setId(cartItemDTO.id());
        cartItem.setProductId(cartItemDTO.productId());
        cartItem.setQuantity(cartItemDTO.quantity());
        cartItem.setPrice(cartItemDTO.price());
        return cartItem;
    }
    public CartItemDTO toCartItemDTO(CartItem cartItem){
        return new CartItemDTO(cartItem.getId(), cartItem.getProductId(), cartItem.getCart().getId(), cartItem.getQuantity(), cartItem.getPrice());
    }
}
