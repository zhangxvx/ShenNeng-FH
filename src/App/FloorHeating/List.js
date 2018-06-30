import React from 'react'
import { Form, TextArea, Card } from 'semantic-ui-react'

const TextAreaExampleMinHeight = (props) => (
    <Form>
        <TextArea autoHeight style={{borderColor: '#DCDCDC', fontFamily: "楷体", fontSize: 30}} value={props.value} />
    </Form>
)
const discribe = "地暖用户预测与分析是基于SVDD算法实现的，考虑了多个因素，包括客户近三年每月的燃气使用情况，用户所在的区域，客户的籍贯，年龄，居住的小区等因素。"

export class List extends React.Component {
    render() {
        return (
            <Card fluid >
                <Card.Content>
                    <Card.Header>地暖用户预测与分析因素</Card.Header>
                </Card.Content>
                <Card.Content style={{ height: 500 }}>
                    <TextAreaExampleMinHeight value={discribe} />
                </Card.Content>
            </Card>
        )
    }
}
