"use strict";


if(document.querySelector(".projects.numbers") != null) {
    $("#navbarNavAltMarkup").find(".active").removeClass("active");
    $("#nav_projects").addClass("active");

    function set_pi_max() {
        document.getElementById("pi_n").value = "3141";
    }

    function set_e_max() {
        document.getElementById("e_n").value = "2718";
    }

    function set_fibo_max() {
      document.getElementById("fibo_n").value = "75";
    }

    function set_prime_factorization_max() {
      document.getElementById("prime_factorization_n").value = "9000000000000000";

    }

    function find_pi_n_decimal_places() {
        var pi_n_div = document.getElementById("pi_n");
        var pi_n_decimal_places = parseInt(pi_n_div.value);
        pi_n_div.innerHTML = pi_n_decimal_places;

        var pi_significant_digits = Math.max(1, pi_n_decimal_places)+1;
        var pi_output_div = document.getElementById("pi_output");
        if (isNaN(pi_n_decimal_places)  ||
            pi_n_decimal_places > 3141 ||
            pi_n_decimal_places < 1) {
          alert("Please enter a number between 1 and 3141.");
          return;
        }

        // extra four digits to avoid rounding errors.
        Decimal.set({ precision: pi_significant_digits+4, rounding: 3 })
        var pi_s = new Decimal(3);
        var pi_lasts = new Decimal(0);
        var pi_t = new Decimal(3);
        var pi_n = new Decimal(1);
        var pi_na = new Decimal(0);
        var pi_d = new Decimal(0);
        var pi_da= new Decimal(24);
        // first iteration: lasts = 3; pi_n=1; pi_na=8; pi_d=24; pi_da=56; pi_t = (3) / 24; pi_s = 3 + 1/8
        while (!pi_s.eq(pi_lasts)) {
            pi_lasts = pi_s;
            //console.log("pi_lasts", pi_lasts);
            pi_n = pi_n.plus(pi_na);
            pi_na = pi_na.plus(new Decimal(8));
            //console.log("pi_n", pi_n);
            //console.log("pi_na", pi_na);
            pi_d = pi_d.plus(pi_da);
            pi_da = pi_da.plus(new Decimal(32));
            //console.log("pi_d", pi_d);
            //console.log("pi_da", pi_da);
            pi_t = (pi_t.times(pi_n)).div(pi_d);
            //console.log("pi_t", pi_t);
            pi_s = pi_s.plus(pi_t);
        }
        // set precision to final calculated amount.
        Decimal.set({ precision: pi_significant_digits, rounding: 3 });
        pi_output_div.innerHTML = pi_s.toPrecision(pi_significant_digits);
    }

    function find_e_n_decimal_places() {
        var e_n_div = document.getElementById("e_n");
        var e_n_decimal_places = parseInt(e_n_div.value);
        e_n_div.innerHTML = e_n_decimal_places;
        var e_significant_digits = Math.max(1, e_n_decimal_places)+1;
        var e_output_div = document.getElementById("e_output");
        if (isNaN(e_n_decimal_places)  ||
            e_n_decimal_places > 2718 ||
            e_n_decimal_places < 1) {
          alert("Please enter a number between 1 and 2718.");
          return;
        }

        // extra four digits to avoid rounding errors.
        Decimal.set({ precision: e_significant_digits+4, rounding: 3 });
        var e_i = new Decimal(0);
        var e_lasts = new Decimal(0);
        var e_s = new Decimal(1);
        var e_fact = new Decimal(1);
        var e_num = new Decimal(1);
        while (!e_s.eq(e_lasts)) {
            e_lasts = e_s;
            e_i = e_i.plus(new Decimal(1));
            e_fact = e_fact.times(e_i);
            e_s = e_s.plus(e_num.div(e_fact));
        }
        // set precision to final calculated amount.
        Decimal.set({ precision: e_significant_digits, rounding: 3 });
        e_output_div.innerHTML = e_s.toPrecision(e_significant_digits);
    }

    function find_n_fibo_numbers() {
        var fibo_n_div = document.getElementById("fibo_n");
        var n = parseInt(fibo_n_div.value);
        fibo_n_div.innerHTML = n;
        var fibo_output_div = document.getElementById("fibo_output");
        if (isNaN(n)  ||
            n > 75 ||
            n < 2) {
          alert("Please enter a number between 2 and 75.");
          return;
        }

        var arr = []
        var next;
        arr.push(1)
        arr.push(1)
        var i = 2
        while (i < n) {
          next = arr[arr.length-2] + arr[arr.length-1];
          arr.push(next);
          i+=1;
        }
        fibo_output_div.innerHTML = arr.toString();
    }

    //////////////// prime number factorization

    function prime_factorization() {
      var prime_factorization_n_div = document.getElementById("prime_factorization_n");
      var n = parseInt(prime_factorization_n_div.value);
      prime_factorization_n_div.innerHTML = n;
      var prime_factorization_output_div = document.getElementById("prime_factorization_output");
      if (isNaN(n)  ||
          n > 9000000000000000 ||
          n < 2) {
        alert("Please enter a number between 2 and nine quadrillion.");
        return;
      }

    // '''Have the user enter a number and find all Prime Factors (if there are any) and display them.'''

      var arr = []

      function firstPrimeFactor(n) {
        // '''Finds the first prime number factorizing n.  Returns 0 if none are found'''
        if (n < 2) {
            return 0
          }
        if (n == 2) {
            return 2
          }
          for (var x = 2; x < Math.floor(Math.sqrt(n)+1); x++) {
            if (n % x == 0) {
                return x
              }
          }
        return 0
        }

      function loop(n) {
          if (n < 2) {
              return
            }
          else {
              var prime = firstPrimeFactor(n)
              if (prime != 0) {
                  arr.push(prime)
                  loop(n/prime)
                }
              else {
                  arr.push(parseInt(n))
                }
                }
              }

      if (n == 1) {
          return [1]
        }
      else if (n < 1) {
          return []
        }
      else {
          loop(n)
        }
      var output_str = arr + "\n\n"
      // Show the work afterward with this loop.
      var newArr = arr.slice(); // make a copy
      for (var i = 0; i < arr.length-1; i++) {
        newArr[1] = newArr[0]*newArr[1]   // multiply first two
        newArr.splice(0,1) // start at 0, delete one
        output_str += newArr + "\n"
      }
      prime_factorization_output_div.innerHTML = output_str;
      return
    }

    ///////////////// Next Prime Number

    var next_prime_slider = document.getElementById("next_prime_slider_n");
    var next_prime_output_n = document.getElementById("next_prime_n_display");
    var next_prime_output = document.getElementById("next_prime_output");
    next_prime_output_n.innerHTML = next_prime_slider.value; // Display the default slider value

    function next_prime_number() {
        //'''Have the program find prime numbers until the user chooses to stop asking for the next one.'''

        function is_prime(n) {
            //'''Is n prime?  True/False'''
            if (n < 2) {
                return false;
              }
            if (n == 2) {
                return true;
              }
            for (var x = 2; x < Math.floor(Math.sqrt(n)+1); x++) {
                if (n % x == 0) {
                    return false;
                  }
                }
            return true;
          }

        var i = parseInt(next_prime_slider.value);
        while (true) {
            if (is_prime(i)) {
                next_prime_output.innerHTML = i;
                break;
              }
            i += 1
          }
    }


    // Update the current slider value (each time you drag the slider handle)
    next_prime_slider.oninput = function() {
        next_prime_output_n.innerHTML = this.value; // shows N value
    }










    document.getElementById("pi_button").addEventListener("click", find_pi_n_decimal_places);
    document.getElementById("e_button").addEventListener("click", find_e_n_decimal_places);
    document.getElementById("fibo_button").addEventListener("click", find_n_fibo_numbers);
    document.getElementById("prime_factorization_button").addEventListener("click", prime_factorization);
    document.getElementById("next_prime_button").addEventListener("click", next_prime_number);

    document.getElementById("pi_max_button").addEventListener("click", set_pi_max);
    document.getElementById("e_max_button").addEventListener("click", set_e_max);
    document.getElementById("fibo_max_button").addEventListener("click", set_fibo_max);
    document.getElementById("prime_factorization_max_button").addEventListener("click", set_prime_factorization_max);
}
