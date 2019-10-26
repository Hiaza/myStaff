from __future__ import division

users = [
    {"id":0,"name":"Artem"},
    {"id":1,"name":"Ann"},
    {"id":2,"name":"Igor"},
    {"id":3,"name":"Zhenya"},
    {"id":4,"name":"Dima"},
    {"id":5,"name":"Vova"},
    {"id":6,"name":"Vlad"},
    {"id":7,"name":"Morys"},
    {"id":8,"name":"Storm"},
    {"id":9,"name":"Wind"}
]

friendships = [(0,1),(0,2),(1,2),(1,3),(2,3),(3,4),
               (4,5),(5,6),(5,7),(6,8),(7,8),(8,9)]

for user in users:
    user["friends"] = []

for i, j in friendships:
    users[i]["friends"].append(users[j])
    users[j]["friends"].append(users[i])

def number_of_friends(user):
    return len(user["friends"])

total_connections = sum(number_of_friends(user) for user in users)

print(total_connections)

num_users = len(users)
avg_connections = total_connections/num_users
print(avg_connections)

num_friends_by_id = [(user["id"],number_of_friends(user)) for user in users]

sorted(num_friends_by_id,
                key=lambda user: user[1], 
                reverse=True)

print(num_friends_by_id)