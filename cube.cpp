#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    ofstream file;
    file.open("cube.txt");

    // Variable 'r' determines the starting state number
    int r = 23;

    // Loop to process states r and r+1
    for (int i = r; i <= r + 1; i++) {
        int n;
        cin >> n; // Number of rotations for this state

        string cur;
        // Read each rotation and build the transformation string
        for (int k = 0; k < n; k++) {
            char c;
            string a;
            cin >> c >> a;
            cur += "rotate";
            cur += toupper(c); // Convert axis to uppercase (X, Y, Z)
            cur += "(";
            cur += a;
            cur += "deg) ";
        }

        // Generate CSS for four possible rotations in this state
        for (int j = 1; j <= 4; j++) {
            file << ".s" << i << j << "{\n  animation-name : s" << i << j << ";\n}\n";
            file << "@keyframes s" << i << j << "{\n";

            // 'from' keyframe with initial rotations
            file << "from{\n  transform : var(--dt) ";
            file << cur << ";\n}\n";

            // 'to' keyframe with an additional rotation
            file << "to{\n  transform : var(--dt) " << cur;

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

