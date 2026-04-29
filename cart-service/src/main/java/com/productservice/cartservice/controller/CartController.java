package com.productservice.cartservice.controller;

import com.productservice.cartservice.mapper.CartMapper;
import com.productservice.cartservice.model.CartDTO;
import com.productservice.cartservice.model.CartItemDTO;
import com.productservice.cartservice.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;
    private final CartMapper cartMapper;

    public CartController(CartService cartService, CartMapper cartMapper) {
        this.cartService = cartService;
        this.cartMapper  = cartMapper;
    }

    @GetMapping("/save")
    public ResponseEntity<String> save(@ModelAttribute CartDTO cartDTO) {
        cartService.save(cartDTO);
        return ResponseEntity.ok("Cart saved");
    }

    @GetMapping("/deleteAll")
    public ResponseEntity<String> deleteAll() {
        cartService.deleteAll();
        return ResponseEntity.ok("All carts deleted");
    }

    @GetMapping("/deleteAllCarts")
    public ResponseEntity<String> deleteAllCarts() {
        cartService.deleteAllCarts();
        return ResponseEntity.ok("All carts deleted");
    }

    @GetMapping("/update")
    public ResponseEntity<String> update(@ModelAttribute CartDTO cartDTO) {
        cartService.updateCart(cartDTO);
        return ResponseEntity.ok("Cart updated");
    }

    @GetMapping("/findAll")
    public ResponseEntity<Iterable<CartDTO>> findAll() {
        return ResponseEntity.ok(cartService.findAll());
    }

    @GetMapping("/findById")
    public ResponseEntity<CartDTO> findById(@RequestParam Long id) {
        return ResponseEntity.ok(cartService.findById(id));
    }

    @GetMapping("/deleteById")
    public ResponseEntity<String> deleteById(@RequestParam Long id) {
        cartService.deleteById(id);
        return ResponseEntity.ok("Cart deleted");
    }

    @PostMapping("/addItem")
    public ResponseEntity<CartItemDTO> addItem(@RequestBody CartItemDTO cartItemDTO) {
        cartService.addItem(cartItemDTO);
        return ResponseEntity.ok(cartItemDTO);
    }

    @PostMapping("/deleteItem")
    public ResponseEntity<String> deleteItem(@RequestBody CartItemDTO cartItemDTO) {
        cartService.deleteItem(cartItemDTO);
        return ResponseEntity.ok("Item deleted");
    }

    @PostMapping("/deleteAllItems")
    public ResponseEntity<String> deleteAllItems() {
        cartService.deleteAll();
        return ResponseEntity.ok("All items deleted");
    }

    @PostMapping("/updateCartItem")
    public ResponseEntity<String> updateCartItem(@RequestBody CartItemDTO cartItemDTO) {
        cartService.addItem(cartItemDTO);
        return ResponseEntity.ok("Cart item updated");
    }
}