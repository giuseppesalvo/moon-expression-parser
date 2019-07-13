export class ASTNode<T> {
    constructor(
        public value: T,
        public leftChildNode?: ASTNode<T>,
        public rightChildNode?: ASTNode<T>,
    ) {}

    toString(count = 0): string {
        if (!this.leftChildNode && !this.rightChildNode)
            return this.value + " => null\n" + Array(count).join("\t") + "    " + "=> null"
        const left: string = this.leftChildNode ? this.leftChildNode.toString(count+2) : "";
        const right: string = this.rightChildNode ? this.rightChildNode.toString(count+2) : "";
        return this.value + "\t=>" + left + "\n" + Array(count+2).join("\t") + "=>" + right;
    }
}

export class AST<T> {

    public nodes: Array<ASTNode<T>> = []

    addNode(value: T): void {
        const rightChildNode = this.nodes.pop();
        const leftChildNode = this.nodes.pop();
        this.nodes.push(
            new ASTNode(
                value,
                leftChildNode,
                rightChildNode,
            )
        )
    }

    push(value: T) {
        this.nodes.push(
            new ASTNode(
                value,
            )
        )
    }

    toString(): String {
        //a little hack I put together so it prints out in a readable formASTNode.prototype.toString = function(count) {
        return this.nodes.toString();
    }

    head(): ASTNode<T> {
        return this.nodes[0];
    }
}
