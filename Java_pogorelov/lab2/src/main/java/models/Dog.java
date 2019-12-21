package models;

public class Dog extends Animals {
    Integer id;
    Boolean has_owner;
    Float frequency_of_bar;

    public Dog(){ };
    public Dog(String name, Long age, Boolean is_in_red_book, Integer id, Boolean has_owner, Float frequency_of_bar) {
        super(name, age, is_in_red_book);
        this.id = id;
        this.has_owner = has_owner;
        this.frequency_of_bar = frequency_of_bar;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getHas_owner() {
        return has_owner;
    }

    public void setHas_owner(Boolean has_owner) {
        this.has_owner = has_owner;
    }

    public Float getFrequency_of_bar() {
        return frequency_of_bar;
    }

    public void setFrequency_of_bar(Float frequency_of_bar) {
        this.frequency_of_bar = frequency_of_bar;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "id=" + id +
                ", has_owner=" + has_owner +
                ", frequency_of_bar=" + frequency_of_bar +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", is_in_red_book=" + is_in_red_book +
                '}';
    }
}
