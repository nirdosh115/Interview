package com.javainterview.backend.model;

public class Revision {
    private Long id;
    private Long questionId;
    private boolean revised;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getQuestionId() {
        return questionId;
    }
    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }
    public boolean isRevised() {
        return revised;
    }
    public void setRevised(boolean revised) {
        this.revised = revised;
    }
}
