#include <bits/stdc++.h>
using namespace std;

/*
// This code takes input values and generates CSS animations with that information, writing to a file titled cube.txt
*/

int main()
{
    ios_base ::sync_with_stdio(false), cin.tie(NULL); // unties the c++ and c stream operators (stdio), unties cin and cout operators
    // these changes make cin and stream operators perform faster
    ofstream file; // opens an output file stream
    file.open("cube.txt"); // opens the file "cube.txt" which holds a single string, "cube" to be outputted from

    //CODE NOT IN USE

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
    for (int i = r; i <= r + 1; i++) // iterates twice
    {
        int n;
        cin >> n;
        string cur;
        for (int k = 0; k < n; k++) // iterates n times, dictated by cin
        {
            // creating a css transformation
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
            // writing css transformations to the output file
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

    file.close(); // closes the output file stream
    return 0;
}