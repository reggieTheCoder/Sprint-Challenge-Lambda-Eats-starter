import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';



const formSchema = yup.object().shape({
    name: yup.string().min(2).required("please enter a Name longer than 2 characters."),
    sauce: yup.string(),
    size: yup.string(),
    pepperoni: yup.boolean().oneOf([true, false]),
    sausage: yup.boolean().oneOf([true, false]),
    canadian: yup.boolean().oneOf([true, false]),
    spicy: yup.boolean().oneOf([true, false]),
    chicken: yup.boolean().oneOf([true, false]),
    onions: yup.boolean().oneOf([true, false]),
    greenPepper: yup.boolean().oneOf([true, false]),
    dicedTomatos: yup.boolean().oneOf([true, false]),
    blackOlives: yup.boolean().oneOf([true, false]),
    roastedGarlic: yup.boolean().oneOf([true, false]),
    artichokeHearts: yup.boolean().oneOf([true, false]),
    threeCheese: yup.boolean().oneOf([true, false]),
    pineapple: yup.boolean().oneOf([true, false]),
    extraCheese: yup.boolean().oneOf([true, false]),
    instructions: yup.string().max(500),
})


const PizzaForm = () => {

    // const FormWrapper=styled.section`
    //     display: block;
    //     padding-bottom: 0%

    // `;

    
    const [addDisabled, setAddDisabled] = useState(true)

    const [formValues, setFormvalues] = useState({
        name: "",
        size: "",
        sauce: "",
        pepperoni: false,
        sausage: false,
        canadian: false,
        spicy: false,
        chicken: false,
        onions: false,
        greenPepper: false,
        dicedTomatos: false,
        blackOlives: false,
        roastedGarlic: false,
        artichokeHearts: false,
        threeCheese: false,
        pineapple: false,
        extrCheese: false,
        instructions: "",

    })

    const [post, setPost] = useState([]);

    const [error, setError] = useState({
        name: "",
        size: "",
        sauce: "",
        pepperoni: false,
        sausage: false,
        canadian: false,
        spicy: false,
        chicken: false,
        onions: false,
        greenPepper: false,
        dicedTomatos: false,
        blackOlives: false,
        roastedGarlic: false,
        artichokeHearts: false,
        threeCheese: false,
        pineapple: false,
        extrCheese: false,
        instructions: "",
    })

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => {
            setAddDisabled(!valid);
        })
    }, [formValues]);

    const onFormSubmit = event => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formValues)
            .then(res => {
                setPost(res.data);


                setFormvalues({
                    name: "",
                    size: "",
                    sauce: "",
                    pepperoni: false,
                    sausage: false,
                    canadian: false,
                    spicy: false,
                    chicken: false,
                    onions: false,
                    greenPepper: false,
                    dicedTomatos: false,
                    blackOlives: false,
                    roastedGarlic: false,
                    artichokeHearts: false,
                    threeCheese: false,
                    pineapple: false,
                    extrCheese: false,
                    instructions: "",

                })
                   
            })
            .catch(err => console.log("POST error:", err.res))
    }

    const validateChange = event => {
        yup.reach(formSchema, event.target.name)
            .validate(event.target.type === "checkbox" ? event.target.checked : event.target.value)
            .then(valid => {
                setError({
                    ...error,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err)
                setError({
                    ...error,
                    [event.target.name]: err.errors[0]
                })
            })
    }



    const inputChange = event => {
        event.persist();
        console.log(event.target.value);
        const newFormData = {
            ...formValues, [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };

        validateChange(event)
        setFormvalues(newFormData);
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <Container>
                    <Row>
                        <Col>
                        <label htmlFor="Name for Order">
                            <h4>Customer Name</h4> 
                            <input
                            data-cy= "nameArea"
                            name="name"
                            type="text"
                            value={formValues.name}
                            onChange={inputChange}
                            />
                            {error.name.length > 0 ? <p>{error.name}</p> : null}
                        </label>
                        </Col>
                    </Row>
                        
                    <Row>
                        <Col>
                            <label htmlFor="size choice">
                                 <h4>Choose Your Size</h4>
                                <select name="size" data-cy="size" onChange={inputChange} >
                                <option value="select">Select</option>
                                <option value="personal">Personal</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                </select>
                            </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="sauce choice">
                                <h4>Choose Your Sauce</h4>
                                <select name="sauce" data-cy="sauce" onChange={inputChange}>
                                <option value="select">Select</option>
                                <option value="original-red">Original</option>
                                <option value="garglic-ranch">Garlic Ranch</option>
                                <option value="bbq">BBQ Sauce</option>
                                <option value="Alfredo">Alfredo</option>
                                </select>
                         </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>
                                <h4>Add Toppings</h4>
                                <p>Choose up to 10</p>
                            </label>
                        </Col>
                    </Row>
        
                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                            <label htmlFor="Pepperoni">
                                <input
                                data-cy= "pepperoni"
                                name="pepperoni"
                                type="checkbox"
                                checked={formValues.pepperoni}
                                onChange={inputChange}
                                />
                                Pepperoni
                            </label>
                        </Col>
                        <Col md={{ size: 'auto', offset:1 }}>
                            <label htmlFor="Sausage">
                                <input
                                    data-cy="sausage"
                                    name="sausage"
                                    type="checkbox"
                                    checked={formValues.sausage}
                                    onChange={inputChange}
                                />
                                Sausage
                             </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                        <label htmlFor="Canadian Bacon">
                            <input
                                data-cy="canadian"
                                name="canadian"
                                type="checkbox"
                                checked={formValues.canadian}
                                onChange={inputChange}
                            />
                            Canadian Bacon

                        </label>
                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Spicy Italian Sausage">
                <input
                    data-cy="spicy"
                    name="spicy"
                    type="checkbox"
                    checked={formValues.spicy}
                    onChange={inputChange}
                />
            Spicy Italian Sausage

        </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                        <label htmlFor="Grilled Chiken">
                <input
                    data-cy="chicken"
                    name="chicken"
                    type="checkbox"
                    checked={formValues.chicken}
                    onChange={inputChange}
                />
            Grilled Chicken

        </label>
                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Onions">
                <input
                    data-cy="Onions"
                    name="onions"
                    type="checkbox"
                    checked={formValues.onions}
                    onChange={inputChange}
                />
            Onions

        </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                        <label htmlFor="Green Pepper">
                <input
                    data-cy="greenPepper"
                    name="greenPepper"
                    type="checkbox"
                    checked={formValues.greenPepper}
                    onChange={inputChange}
                />
            Green Pepper

        </label>

                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Diced Tomatos">
                <input
                    data-cy="dicedTomatos"
                    name="dicedTomatos"
                    type="checkbox"
                    checked={formValues.dicedTomatos}
                    onChange={inputChange}
                />
            Diced Tomatos

        </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                        <label htmlFor="Black Olives">
                <input
                    data-cy="blackOlives"
                    name="blackOlives"
                    type="checkbox"
                    checked={formValues.blackOlives}
                    onChange={inputChange}
                />
            Black Olives

        </label>
                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Roasted Garlic">
                <input
                    data-cy="roastedGarlic"
                    name="roastedGarlic"
                    type="checkbox"
                    checked={formValues.roastedGarlic}
                    onChange={inputChange}
                />
            Roasted Garlic

        </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                        <label htmlFor="Artichoke">
                <input
                    data-cy="artichoke"
                    name="artichokeHearts"
                    type="checkbox"
                    checked={formValues.artichoke}
                    onChange={inputChange}
                />
            Artichoke Hearts

        </label>
                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Three Cheese">
                <input
                    data-cy="threeCheese"
                    name="threeCheese"
                    type="checkbox"
                    checked={formValues.threeCheese}
                    onChange={inputChange}
                />
            Three Cheese

        </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ size: 'auto', offset: 4 }}>
                            
        <label htmlFor="Pineapple">
                <input
                    data-cy="pineapple"
                    name="pineapple"
                    type="checkbox"
                    checked={formValues.pineapple}
                    onChange={inputChange}
                />
           Pineapple  

        </label>
                        </Col>
                        <Col md={{ size: 'auto' }}>
                        <label htmlFor="Exrta Cheese">
                <input
                    data-cy="extraCheese"
                    name="extraCheese"
                    type="checkbox"
                    checked={formValues.extraCheese}
                    onChange={inputChange}
                />
            Extra Cheese

        </label>
                        </Col>
                    </Row>

                
       

            
        
        
         
       

      

       

       

      

     
        

    

     

     

        


    

        

            <label htmlFor="special instructions">
                <h4>Special Instructions</h4>
            <textarea
                    data-cy="instructions"
                    name="instructions"
                    type="text"
                    value={formValues.instructions}
                    onChange={inputChange}
                />

            </label><br />
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button data-cy="addButton" disabled={addDisabled}>Add to Order</button>
            </Container>
        </form>
        
        </div>
  

    )

}

export default PizzaForm;