s_num = [
    ' __      __  __      __  __  __  __  __     ',
    '|  |   | __| __||__||__ |__    ||__||__|    ',
    '|__|   ||__  __|   | __||__|   ||__| __| __ '
]

ERROR_CODE = 10


def idx_in_pat(num: int):  # find index in s_num for print number in seven segment format
    start_idx = num*4
    end_idx = num*4 + 4
    return [start_idx, end_idx]


def print_time(h: str, m: str, s: str):
    err = False
    if int(m) >= 60 or int(s) >= 60:  # check error
        err = True
    time = [h, m, s]
    for row in range(3):  # there have 3 row to print
        for part in range(3):  # there have 3 part of time
            for num in time[part]:  # for number in each part

                [start, end] = idx_in_pat(
                    int(num)) if not err else idx_in_pat(ERROR_CODE)
                # print part of number in seven segment format
                print(s_num[row][start:end], end=' ')

            if part == 2:
                continue
            if row != 0:
                print('·', end=' ')
            else:
                print(' ', end=' ')
        print('')  # new line


def main():
    tmp: str = ''
    tmp = input('input: ').strip()
    [h, m, s] = tmp.split(':')
    print_time(h, m, s)


if __name__ == "__main__":
    main()
