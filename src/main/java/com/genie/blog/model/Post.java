package com.genie.blog.model;

import com.genie.blog.dto.PostRequestDto;
import com.genie.blog.security.UserDetailsImpl;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Post extends Timestamped {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    public Post(PostRequestDto requestDto, UserDetailsImpl userDetails) {
        this.username = userDetails.getUsername();
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }

    public void update(PostRequestDto requestDto, UserDetailsImpl userDetails) {
        this.username = userDetails.getUsername();
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }
}
