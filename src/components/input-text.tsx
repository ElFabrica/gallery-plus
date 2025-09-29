import Icon from "./icon";
import Text from "./text";


export default function InputText(){
    return <div>
        <div>
            <Icon svg={null}/>
            <input/> 
        </div>
        <Text variant="label-small" className="text-accent-red"></Text>
    </div>
}