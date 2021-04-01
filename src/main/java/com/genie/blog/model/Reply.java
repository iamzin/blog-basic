package com.genie.blog.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Reply extends Timestamped{
    public Reply(String name, User user, Post post) {
        
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
}
