#include <stdexcept>
#include <string>
#include <iostream>

class Node
{
public:
    Node(int value, Node* left, Node* right)
    {
        this->value = value;
        this->left = left;
        this->right = right;
    }

    int getValue() const
    {
        return value;
    }

    Node* getLeft() const
    {
        return left;
    }

    Node* getRight() const
    {
        return right;
    }

private:
    int value;
    Node* left;
    Node* right;
};


class BinarySearchTree
{
public:
    static bool contains(const Node& root, int value)
    {
        const Node * x = root.getLeft();
        const Node * y = root.getRight();
        if(root.getValue()>value && x!=NULL){
            std::cout << "false";            
            return contains(*x,value);
        }else if(root.getValue()<value && y!=NULL){
            std::cout << "true";            
            return contains(*y,value);
        }else if(root.getValue()==value){
            std::cout << "yep";
            return true;
        } 
        else return false; 
        
        //throw std::logic_error("Waiting to be implemented");
    }
    bool checkIfContains(Node*x, Node*y,int value){
        if(x->getValue()==value||y->getValue()==value){
            return true;
        }else return false;
    }
};

int main()
{
    Node n1(1, NULL, NULL);
    Node n3(3, NULL, NULL);
    Node n2(2, &n1, &n3);

    std::cout << BinarySearchTree::contains(n2, 3);
}