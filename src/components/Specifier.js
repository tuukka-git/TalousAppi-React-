import axios from "axios";
import { useEffect, useState } from "react";


const Specifier = ({Undefined, tags}) => {

    const [types, setTypes] = useState([]);

    useEffect( async () => {
        await axios.get("http://127.0.0.1:8080/api/types")
        .then((response) => setTypes(response.data))
        .catch((err) => console.log(err))
    },[])

    return(
        <div>
        {Undefined[0].map(u => <Row t={u} types={types} tags={tags} />)}
        </div>
    );
}

const Row = ({t, types, tags}) => {

    useEffect(()=> {
        tags[t] = '0';
        console.log(tags)
    },[])

    const handleChange = (e) => {
        tags[t] = e.target.value;
        console.log(e.target.options[e.target.value])
        console.log(tags)
    }

    return(
        <div class="col-md-4 offset-md-4 ">
            <div class="input-group mb-3">
                <div class="w-75 input-group-prepend">
                    <label class="input-group-text" for="type">{t}</label>
                </div>
                <select class=" w-25 custom-select" id="types" onChange={handleChange}>
                    {types.map(type => <option value={type.type_id}>{type.typeName}</option>)}
                </select>
            </div>
        </div>
    );
}



export default Specifier;