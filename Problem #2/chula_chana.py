places = ['Mahamakut Building', 'Sara Phra Kaew',
          'CU Sport Complex', 'Sanum Juub', 'Samyan Mitr Town']

place_user = list()


def find_idx(phone_number, lt):
    for idx, e in enumerate(lt):
        if e['phone'] == phone_number:
            return idx
    return -1


def print_line():
    print('-----------------------------------------------------------------')


def check_in():
    print('Check in')
    phone_number = input("Enter phone number: ")
    for idx, place in enumerate(places):
        print(f"    {idx+1}. {place}")
    place_number = int(input("Select the place: "))
    tmp_idx = find_idx(phone_number, place_user)
    if(tmp_idx != -1):
        place_user[tmp_idx]['place'] = place_number-1
    else:
        place_user.append({'place': place_number-1, 'phone': phone_number})
    print(f"Checking in {phone_number} into {places[place_number-1]}")


def check_out():
    print('Check out')
    phone_number = input("Enter phone number: ")
    tmp_idx = find_idx(phone_number, place_user)
    if tmp_idx == -1:
        return
    place_user.pop(tmp_idx)


def current_population():
    print('Current Population')
    for idx, place in enumerate(places):
        cnt = len(list(filter(lambda x: x['place'] == idx, place_user)))
        print(f"    {idx+1}. {place}: {cnt}")


def main():
    print("Welcome to Chula Chana!!!")
    print('''Available commands:
    1. Check in user
    2. Check out user
    3. Print people count''')
    command = input("Please input any number: ")
    print_line()
    if command == '1':
        check_in()
    elif command == '2':
        check_out()
    elif command == '3':
        current_population()
    print_line()


if __name__ == "__main__":
    while True:
        main()
