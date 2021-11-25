
function Validator(options)
{
    function getParrent(element, selector)  // tìm xem thẻ cha selector của element đang ở đâu, trả về lớp cha selector
    {
        while(element.parentElement)
        {
            if(element.parentElement.matches(selector))
            {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};
    //hàm thực thi validate
    function checkValidate(inputElement, rule)
    {
        var errorMessage
        var errorElement = getParrent(inputElement,options.formGroupSelector).querySelector(options.errorSelector); //parentElement : lấy lớp cha. từ lớp cha dùng querySelector lấy lớp con là .error       
       
        //lấy ra các rule của selector
        var ruleTest = selectorRules[rule.selector];    //ruleTest là 1 mảng chứa các rule theo thứ tự

        //lặp qua từng rule & check
       
        if(errorMessage)
        {
            //inputElement.placeholder=errorMessage;
            errorElement.innerText = errorMessage;
            inputElement.classList.add('invalid'); //thêm 1 class mới cho inputElement là: invalid
            return false; //trả về false nếu có lỗi
        }
        else
        {
            errorElement.innerText = '';
            inputElement.classList.remove('invalid');
            return true; // trả về true nếu k có lỗi
        }
        //return !errorMessage;
    }
	var formElement = document.querySelector(options.form); //lấy ra element của #form cần validate

    if(formElement)
    {      
        //khi ấn register
        formElement.onsubmit = function(e)
        {
            e.preventDefault();
            var correctInput = true;
            options.rules.forEach(function(rule)
            {
               var inputElement = formElement.querySelector(rule.selector);
               var input = checkValidate(inputElement,rule); //nếu có lỗi thì input = false
               if(!input)
               {
                   correctInput = false;
               }               
            });
                                                
            if(correctInput)
            {
                //trường hợp submit với Javascript 
                if(typeof options.onSubmit === 'function')
                {
                    //lấy tất cả selector có [name] và không bị [disable]
                    var enableInput = formElement.querySelectorAll('[name]:not([disable])'); //enableInput này đang là 1 nodeList
                    //Array.from có nhiệm vụ convert enableInput sang Array.// Khi nó đã là array ta có thể .reduce() để lấy đi tất cả value của enableInput 
                    var formValue = {};
                    formValue = Array.from(enableInput).reduce(function(value, input)
                    {       //Reduce là một phương thức sẵn có được sử dụng để thực thi một hàm lên các phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất.
                        value[input.name] = input.value; //value[fname] = "Xuân"        / value[lname]="nam"
                        return value;                    //value { fname: "Xuân"}       /value {fname:"Xuân" , lname: "nam"}
                    }, {});   //{} là initialValue => giá trị khởi tạo
                    
                    //qua mỗi ô nhớ của mảng, hàm trong reduce được callback(gọi lại), biến tích trữ(biến value) là giá trị return của function
                    //currentValue là biến giá trị hiện tại của mảng (biến input)
                    options.onSubmit(formValue);  
                }
                //trường hợp submit với hành vi mặc định (bằng html)
                else
                {
                    formElement.Submit();
                }
            }
        }
        //lặp qua mỗi rule và xử lý (lắng nghe sự kiện oninput,onblur,...)

        //forEach có tác dụng chạy vòng lặp từ đầu đến cuối options.rules
        options.rules.forEach(function(rule) //rule mang giá trị gồm tổng các selector trong rules(bên html), cụ thể là Validator.isRequired()
        {                                      // và hàm Validator.isRequired sẽ trả về 1 object gồm 2 giá trị: selector và hàm test
         
            //Lưu lại toàn bộ rule đã thiết lập 
            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test); //sau vòng đầu tiên thì selectorRules[rule.selector] đã là 1 mảng, nên sẽ lọt vào true
                                                            //tiếp tục push(rule.test) vào object selectorRules[rule.selector] 
            }
            else
            {
                selectorRules[rule.selector] = [rule.test];//dùng ngoặc vuông để lưu lại key của object
                //trong lần đầu tiên chạy, ta gắn cho selectorRules[rule.selector] bằng 1 mảng
                // có phần tử đầu tiên là rule đầu tiên ([rule.test])
            }
            var inputElement = formElement.querySelector(rule.selector);  //dùng chính thông tin #form lấy được ở trên để chọn các rule.selector  , cụ thể là fname,..  
                                                                          // tránh dùng document.getElementById trong trường hợp có nhiều form
      //inputElement sẽ chứa thông tin của từng selector trong function: rules, cụ thể là Validator.isRequired và những thằng khác     
                    
            if(inputElement)
            {
                //inputElement.value : lấy giá trị text người dùng nhập vào, cụ thể là ô fname
                //test func: lấy qua rule.test viết rule.test làm 1 function nhận đối số inputElement.value, từ đó kiểm tra xem nhập đúng hay chưa
                
                inputElement.onblur = function()//onbur là 1 event( sự kiện ) khi người dùng click chuột ra khỏi 1 selector, cụ thể là ô fname
                {          
                   checkValidate(inputElement,rule);
                }
                // khi người dùng nhập thì tắt khung màu đỏ và cảnh báo
                inputElement.oninput = function() //oninput là event mỗi khi người dùng đang nhập liệu 
                {
                    var errorElement = getParrent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.classList.remove('invalid');
                }
            }
        }); 
    }
}

//định nghĩa rules
//nguyên tắc của rules:
//1.khi có lỗi => message báo lỗi
//2. khi hợp lệ => không trả về cái gì cả(undefined)
Validator.isRequired= function(selector, text_box){
	return {
        selector:selector,      //return trả về 1 object gồm 2 key: selector và test 
        test: function(value)
        {       //key test lại là 1 function sẽ trả về lời nhắc user nhập đúng định dạng
            return value.trim() ? undefined : `Vui lòng nhập ${text_box} của bạn!`;
        }
    };
}

Validator.isEmail= function(selector){
	return {
        selector:selector,
        test: function(value)
        {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regex = a regular expression là một biểu thức chính quy. 
            return regex.test(value) ? undefined: 'Định dạng email không hợp lệ!';
        }
    };
}
Validator.minLength = function(selector, min){
	return {
        selector:selector,
        test: function(value)
        {
            var length = value.trim().length;
                return length >= min ? undefined : `Vui lòng nhập mật khẩu tối thiểu ${min} kí tự!`;
        }
    };
}
Validator.confirmPassword = function(selector, getConfirmValue, message){
	return {
        selector:selector,
        test: function(value)
        {
            return value === getConfirmValue() ? undefined : message|| 'Vui lòng nhập ô này!!';
        }
    };
}
export default {
    Validator
}