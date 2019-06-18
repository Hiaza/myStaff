#include <stdexcept>
#include <iostream>
#include <vector>
#include <utility>
#include <map>

std::pair<int, int> findTwoSum(const std::vector<int>& list, int sum)
{
    std::pair<int, int> result;
    std::map<int, int> m;
    for(int i = 0;i<list.size();i++){
        m.insert ( std::pair<int,int>(list.at(i),i) );
    }
    for (int i = 0; i<list.size();i++) {
        int rest = sum - list.at(i);
        if (m[rest] && m[rest]!=i) {
            result = {i,m[rest]};         
            return result;
        }
    }
    result = {-1,-1};
    return result;

   // throw std::logic_error("Waiting to be implemented");
}

int main()
{
    std::vector<int> list = {3,8,4,3,2};
    std::pair<int, int> indices = findTwoSum(list, 10);
    std::cout << indices.first << '\n' << indices.second;
}
