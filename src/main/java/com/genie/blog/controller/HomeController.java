package com.genie.blog.controller;

import com.genie.blog.model.Post;
import com.genie.blog.repository.PostRepository;
import com.genie.blog.security.UserDetailsImpl;
import com.genie.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class HomeController {

    private final PostRepository postRepository;
    private final PostService postService;

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails != null) {
            String username = userDetails.getUsername();
            model.addAttribute("username", username);
            return "index";
        }
        model.addAttribute("message", "null");
        return "index";
    }

    @GetMapping("/detail")
    public String detail(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails, Post post) {
        if (userDetails != null) {
            String username = userDetails.getUsername();
            model.addAttribute("username", username);
            return "detail";
        }
        model.addAttribute("message", "null");
        return "detail";
    }
}


