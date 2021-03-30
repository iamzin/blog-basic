package com.genie.blog.service;

import com.genie.blog.model.Post;
import com.genie.blog.dto.PostRequestDto;
import com.genie.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public Long update(Long id, PostRequestDto requestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당하는 아이디가 존재하지 않습니다.")
        );
        post.update(requestDto);
        return id;
    }
}
