package models;

public abstract class Animals {
    String name;
    Long age;
    Boolean is_in_red_book;

    public Animals() { }

    public Animals(String name, Long age, Boolean is_in_red_book) {
        this.name = name;
        this.age = age;
        this.is_in_red_book = is_in_red_book;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public Boolean getIs_in_red_book() {
        return is_in_red_book;
    }

    public void setIs_in_red_book(Boolean is_in_red_book) {
        this.is_in_red_book = is_in_red_book;
    }

    @Override
    public String toString() {
        return "Animals{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", is_in_red_book=" + is_in_red_book +
                '}';
    }
}

