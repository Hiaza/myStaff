package models;

public class Cat extends Animals {
    Integer id;
    Boolean has_owner;
    Float frequency_of_mur;

    public Cat(){ }

    public Cat(String name, Long age, Boolean is_in_red_book, Integer id, Boolean has_owner, Float frequency) {
        super(name, age, is_in_red_book);
        this.id = id;
        this.has_owner = has_owner;
        this.frequency_of_mur = frequency;
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

    public Float getFrequency_of_mur() {
        return frequency_of_mur;
    }

    public void setFrequency_of_mur(Float frequency_of_mur) {
        this.frequency_of_mur = frequency_of_mur;
    }

    @Override
    public String toString() {
        return "Cat{" +
                "id=" + id +
                ", has_owner=" + has_owner +
                ", frequency_of_mur=" + frequency_of_mur +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", is_in_red_book=" + is_in_red_book +
                '}';
    }
}
