package com.productservice.cartservice.service;

import com.productservice.cartservice.mapper.CartMapper;
import com.productservice.cartservice.model.Cart;
import com.productservice.cartservice.model.CartDTO;
import com.productservice.cartservice.model.CartItem;
import com.productservice.cartservice.model.CartItemDTO;
import com.productservice.cartservice.repository.CartItemRepository;
import com.productservice.cartservice.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private CartMapper mapper;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, CartMapper mapper) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.mapper = mapper;
    }

    public void save(CartDTO cartDTO){
        Cart cart = mapper.toCartEntity(cartDTO);
        cartRepository.save(cart);
    }

    public List<CartDTO> findAll(){
        return cartRepository.findAll().stream().map(mapper::toCartDTO).toList();
    }

    public CartDTO findById(Long id){
        return mapper.toCartDTO(cartRepository.findById(id).orElseThrow());
    }

    public void deleteById(Long id){
        cartRepository.deleteById(id);
    }

    public void addItem(CartItemDTO cartItem){
        CartItem item = mapper.toCartItemEntity(cartItem);
        cartItemRepository.save(item);
    }

    public void deleteItem(CartItemDTO cartItem){
        cartItemRepository.delete(mapper.toCartItemEntity(cartItem));
    }
    public void deleteAll(){
        cartItemRepository.deleteAll();
    }

    public void deleteAllCarts(){
        cartRepository.deleteAll();
    }

    public void updateCart(CartDTO cartDTO){
        cartRepository.save(mapper.toCartEntity(cartDTO));
    }


}

