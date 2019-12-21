package models;

public class Owner {
    Integer id;
    String first_name;
    Float rate;

    public Owner() { }

    public Owner(Integer id, String first_name, Float rate) {
        this.id = id;
        this.first_name = first_name;
        this.rate = rate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        return "Owner{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", rate=" + rate +
                '}';
    }
}
