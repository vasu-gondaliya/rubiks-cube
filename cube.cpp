#include <bits/stdc++.h>
using namespace std;
int main()
{
    ios_base ::sync_with_stdio(false), cin.tie(NULL);
    ofstream file;
    file.open("cube.txt");
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#f" << i << "{\ntransform : translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#b" << i << "{\ntransform : translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#r" << i << "{\ntransform : rotateY(90deg) translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#l" << i << "{\ntransform : rotateY(90deg) translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#u" << i << "{\ntransform : rotateX(90deg) translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    /*for (int i = 1; i <= 9; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        file << "#d" << i << "{\ntransform : rotateX(90deg) translate3d(" << x << "px," << y << "px," << z << "px);}\n";
    }*/
    int r = 23;
    for (int i = r; i <= r + 1; i++)
    {
        int n;
        cin >> n;
        string cur;
        for (int k = 0; k < n; k++)
        {
            char c;
            string a;
            cin >> c >> a;
            cur += "rotate";
            cur += toupper(c);
            cur += "(";
            cur += a;
            cur += "deg) ";
        }
        for (int j = 1; j <= 4; j++)
        {
            file << ".s" << i << j << "{\n  animation-name : s" << i << j << ";\n}\n@keyframes s" << i << j << "{\n";

            file << "from{\n  transform : var(--dt) ";
            file << cur;
            file << ";\n}\n";
            file << "to{\n       transform : var(--dt) " << cur;
            char c;
            int a;
            cin >> c >> a;
            c = toupper(c);
            file << "rotate" << c << "(" << a << "deg) ";
            file << ";\n}\n}\n";
        }
    }

    file.close();
    return 0;
}