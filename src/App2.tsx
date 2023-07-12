import { useMemo } from 'react';
import { Button, Checkbox, Col, Divider, List, Row, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';

import { model } from './model/model';

export const App2 = () => {
  const input = useStore(model.$input);
  const todos = useStore(model.$todos);

  const competedTodo = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  const uncompetedTodo = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  return (
    <>
      <Row gutter={8}>
        <Col>
          <Input
            placeholder="Enter your todo"
            value={input}
            onChange={(event) => model.change(event.currentTarget.value)}
          />
        </Col>
        <Col>
          <Button onClick={model.submit}>add</Button>
        </Col>
      </Row>
      <Divider orientation="left">Uncompleted todo:</Divider>
      <List
        bordered
        dataSource={competedTodo}
        renderItem={({ id, value, completed }) => (
          <List.Item>
            <Checkbox
              checked={completed}
              onChange={() => model.complete({ id, completed: !completed })}
            >
              {value}
            </Checkbox>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => model.remove(id)}
            />
          </List.Item>
        )}
      />
      <Divider orientation="left">Completed todo:</Divider>
      <List
        bordered
        dataSource={uncompetedTodo}
        renderItem={({ id, value, completed }) => (
          <List.Item>
            <Checkbox
              checked={completed}
              onChange={() => model.complete({ id, completed: !completed })}
            >
              {value}
            </Checkbox>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => model.remove(id)}
            />
          </List.Item>
        )}
      />
    </>
  );
};
