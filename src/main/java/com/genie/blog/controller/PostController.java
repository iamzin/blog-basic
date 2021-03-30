package com.genie.blog.controller;

import com.genie.blog.model.Post;
import com.genie.blog.dto.PostRequestDto;
import com.genie.blog.repository.PostRepository;
import com.genie.blog.security.UserDetailsImpl;
import com.genie.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.graalvm.compiler.lir.LIRInstruction;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Controller
public class PostController {

    private final PostRepository postRepository;
    private final PostService postService;

    @PostMapping("/api/post")
    public Post createPost(@RequestBody PostRequestDto requestDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Post post = new Post(requestDto);
        return postRepository.save(post);
    }

    @GetMapping("/api/post")
    public List<Post> readPost() {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();
        return postRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(start, end);
    }

    @GetMapping("/detail")
    public ModelAndView openPost() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("detail.html");
        return modelAndView;
    }

    @GetMapping("/detail/{id}")
    public Post detailPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당하는 게시물이 없습니다.")
        );
    }

    @DeleteMapping("/detail/{id}")
    public Long deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return id;
    }

    @PutMapping("/detail/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        postService.update(id, requestDto);
        return id;
    }


}
